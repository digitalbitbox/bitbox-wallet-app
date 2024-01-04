/**
 * Copyright 2022 Shift Crypto AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { route } from '../../utils/route';
import * as accountApi from '../../api/account';
import { getExchangeSupportedAccounts } from './utils';
import Guide from './guide';
import { AccountSelector, TOption, setOptionBalances } from '../../components/accountselector/accountselector';
import { GuidedContent, GuideWrapper, Header, Main } from '../../components/layout';
import { Spinner } from '../../components/spinner/Spinner';
import { findAccount, getCryptoName } from '../account/utils';
import { View, ViewContent } from '../../components/view/view';
import { HideAmountsButton } from '../../components/hideamountsbutton/hideamountsbutton';

type TProps = {
    accounts: accountApi.IAccount[];
    code: string;
}

export const BuyInfo = ({ code, accounts }: TProps) => {
  const [selected, setSelected] = useState<string>(code);
  const [options, setOptions] = useState<TOption[]>();
  const [disabled, setDisabled] = useState<boolean>(false);

  const { t } = useTranslation();

  const checkSupportedCoins = useCallback(async () => {
    try {
      const supportedAccounts = await getExchangeSupportedAccounts(accounts);
      const options =
        supportedAccounts.map(({ name, code, coinCode, bitsuranceStatus }) => ({ label: `${name}`, value: code, coinCode, disabled: false, insured: bitsuranceStatus === 'active' }));
      setOptions(await setOptionBalances(options));
    } catch (e) {
      console.error(e);
    }

  }, [accounts]);

  const maybeProceed = useCallback(async () => {
    if (options !== undefined && options.length === 1) {
      const accountCode = options[0].value;
      const connectResult = await accountApi.connectKeystore(accountCode);
      if (!connectResult.success) {
        return;
      }
      route(`/buy/exchange/${accountCode}`);
    }
  }, [options]);

  const handleChangeAccount = (selected: string) => {
    setSelected(selected);
  };

  useEffect(() => {
    checkSupportedCoins();
  }, [checkSupportedCoins]);

  useEffect(() => {
    maybeProceed();
  }, [maybeProceed, options]);

  const handleProceed = async () => {
    setDisabled(true);
    try {
      const connectResult = await accountApi.connectKeystore(selected);
      if (!connectResult.success) {
        return;
      }
    } finally {
      setDisabled(false);
    }
    route(`/buy/exchange/${selected}`);
  };

  if (options === undefined) {
    return <Spinner guideExists={false} text={t('loading')} />;
  }

  const account = findAccount(accounts, code);
  const name = getCryptoName(t('buy.info.crypto'), account);

  return (
    <Main>
      <GuideWrapper>
        <GuidedContent>
          <Header title={<h2>{t('buy.info.title', { name })}</h2>}>
            <HideAmountsButton />
          </Header>
          <View width="550px" verticallyCentered fullscreen={false}>
            <ViewContent>
              { options.length === 0 ? (
                <div className="content narrow isVerticallyCentered">{t('accountSummary.noAccount')}</div>
              ) : (
                <AccountSelector
                  title={t('buy.title', { name })}
                  disabled={disabled}
                  options={options}
                  selected={selected}
                  onChange={handleChangeAccount}
                  onProceed={handleProceed}
                />
              )}
            </ViewContent>
          </View>
        </GuidedContent>
        <Guide name={name} />
      </GuideWrapper>
    </Main>
  );
};

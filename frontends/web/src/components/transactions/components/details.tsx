import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ITransaction, IAmount, getTransaction } from '@/api/account';
import { A } from '@/components/anchor/anchor';
import { Dialog } from '@/components/dialog/dialog';
import { FiatConversion } from '@/components/rates/rates';
import { Amount } from '@/components/amount/amount';
import { Note } from '@/components/transactions/note';
import { TxDetail } from './detail';
import { Arrow } from './arrow';
import { TxDateDetail } from './date';
import { TxStatusDetail } from './status';
import { TxAddressOrTxID } from './address-or-txid';
import parentStyle from '../transaction.module.css';

type TProps = {
  open: boolean;
  onClose: () => void;
  accountCode: string;
  internalID: string;
  note: string;
  status: ITransaction['status'];
  type: ITransaction['type'];
  numConfirmations: number;
  numConfirmationsComplete: number;
  time: string | null;
  amount: IAmount;
  sign: string;
  typeClassName: string;
  feeRatePerKb: IAmount;
  explorerURL: string;
}

export const TxDetailsDialog = ({
  open,
  onClose,
  accountCode,
  internalID,
  note,
  status,
  type,
  numConfirmations,
  numConfirmationsComplete,
  time,
  amount,
  sign,
  typeClassName,
  feeRatePerKb,
  explorerURL,
}: TProps) => {
  const { t } = useTranslation();

  const transactionInfo = useRef<ITransaction | null>();

  useEffect(() => {
    if (!transactionInfo.current) {
      getTransaction(accountCode, internalID).then(transaction => {
        if (!transaction) {
          console.error('Unable to retrieve transaction ' + internalID);
        }
        transactionInfo.current = transaction;
      }).catch(console.error);
    }
  }, [accountCode, internalID]);

  // Amount and Confirmations info are displayed using props data
  // instead of transactionInfo because they are live updated.
  return (
    <Dialog
      open={open && !!transactionInfo.current}
      title={t('transaction.details.title')}
      onClose={onClose}
      slim
      medium>
      {transactionInfo.current && (
        <>
          <Note
            accountCode={accountCode}
            internalID={internalID}
            note={note}
          />
          <TxDetail label={t('transaction.details.type')}>
            <Arrow
              status={status}
              type={type}
            />
          </TxDetail>
          <TxDetail label={t('transaction.confirmation')}>{numConfirmations}</TxDetail>
          <TxStatusDetail
            status={status}
            numConfirmations={numConfirmations}
            numConfirmationsComplete={numConfirmationsComplete}
          />
          <TxDateDetail time={time} />
          <TxDetail label={t('transaction.details.fiat')}>
            <span className={`${parentStyle.fiat} ${typeClassName}`}>
              <FiatConversion amount={amount} sign={sign} noAction />
            </span>
          </TxDetail>
          <TxDetail label={t('transaction.details.fiatAtTime')}>
            <span className={`${parentStyle.fiat} ${typeClassName}`}>
              {transactionInfo.current.amountAtTime ?
                <FiatConversion amount={transactionInfo.current.amountAtTime} sign={sign} noAction />
                :
                <FiatConversion noAction />
              }
            </span>
          </TxDetail>
          <TxDetail label={t('transaction.details.amount')}>
            <span className={`${parentStyle.amount} ${typeClassName}`}>
              {sign}
              <Amount amount={amount.amount} unit={amount.unit} />
            </span>
            {' '}
            <span className={`${parentStyle.currencyUnit} ${typeClassName}`}>{transactionInfo.current.amount.unit}</span>
          </TxDetail>
          {
            transactionInfo.current.fee && transactionInfo.current.fee.amount ? (
              <TxDetail
                label={t('transaction.fee')}
                title={feeRatePerKb.amount ? feeRatePerKb.amount + ' ' + feeRatePerKb.unit + '/Kb' : ''}
              >
                <Amount amount={transactionInfo.current.fee.amount} unit={transactionInfo.current.fee.unit} />
                {' '}
                <span className={parentStyle.currencyUnit}>{transactionInfo.current.fee.unit}</span>
              </TxDetail>
            ) : (
              <TxDetail label={t('transaction.fee')}>---</TxDetail>
            )
          }
          <TxAddressOrTxID
            label={t('transaction.details.address')}
            addresses={transactionInfo.current.addresses}
          />
          {
            transactionInfo.current.gas ? (
              <TxDetail label={t('transaction.gas')}>{transactionInfo.current.gas}</TxDetail>
            ) : null
          }
          {
            transactionInfo.current.nonce ? (
              <TxDetail label="Nonce">{transactionInfo.current.nonce}</TxDetail>
            ) : null
          }
          {
            transactionInfo.current.weight ? (
              <TxDetail label={t('transaction.weight')}>
                {transactionInfo.current.weight}
                {' '}
                <span className={parentStyle.currencyUnit}>WU</span>
              </TxDetail>
            ) : null
          }
          {
            transactionInfo.current.vsize ? (
              <TxDetail label={t('transaction.vsize')}>
                {transactionInfo.current.vsize}
                {' '}
                <span className={parentStyle.currencyUnit}>b</span>
              </TxDetail>
            ) : null
          }
          {
            transactionInfo.current.size ? (
              <TxDetail label={t('transaction.size')}>
                {transactionInfo.current.size}
                {' '}
                <span className={parentStyle.currencyUnit}>b</span>
              </TxDetail>
            ) : null
          }
          <TxAddressOrTxID
            label={t('transaction.explorer')}
            txid={transactionInfo.current.txID}
          />
          <div className={`${parentStyle.detail} flex-center`}>
            <A
              href={explorerURL + transactionInfo.current.txID}
              title={`${t('transaction.explorerTitle')}\n${explorerURL}${transactionInfo.current.txID}`}>
              {t('transaction.explorerTitle')}
            </A>
          </div>
        </>
      )}
    </Dialog>
  );
};

/**
 * Copyright 2020 Shift Crypto AG
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

import 'jest';
import { deep } from 'preact-render-spy';
import '../../matchmediastub';
jest.mock('../../../src/i18n/i18n');

import { h } from 'preact';

import i18n from '../../../src/i18n/i18n';
import { LanguageSwitch } from '../../../src/components/language/language';

describe('components/language/language', () => {
    describe('selectedIndex', () => {
        const supportedLangs = [
            {code: 'en', display: 'EN'},
            {code: 'en-US', display: 'EN'},
            {code: 'pt', display: 'PT'},
        ];

        supportedLangs.forEach((lang, idx) => {
            it(`returns exact match (${lang.code})`, (done) => {
                i18n.changeLanguage(lang.code, (err) => {
                    expect(err).toBe(null);
                    /* @ts-ignore */
                    const ctx = deep(<LanguageSwitch i18n={i18n} languages={supportedLangs} />);
                    expect(ctx.state('selectedIndex')).toEqual(idx);
                    done();
                });
            });
        });

        it('matches main language tag', (done) => {
            i18n.changeLanguage('pt_BR', (err) => {
                expect(err).toBe(null);
                /* @ts-ignore */
                const ctx = deep(<LanguageSwitch i18n={i18n} languages={supportedLangs} />);
                expect(ctx.state('selectedIndex')).toEqual(2); // 'pt'
                done();
            });
        });

        it('returns default if none matched', (done) => {
            i18n.changeLanguage('it', (err) => {
                expect(err).toBe(null);
                /* @ts-ignore */
                const ctx = deep(<LanguageSwitch i18n={i18n} languages={supportedLangs} />);
                expect(ctx.state('selectedIndex')).toEqual(0); // 'en'
                done();
            });
        });
    });
});

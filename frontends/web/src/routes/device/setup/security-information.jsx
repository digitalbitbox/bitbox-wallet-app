import { Component } from 'preact';
import { translate } from 'react-i18next';
import { Button } from '../../../components/forms';
import { Shift } from '../../../components/icon/logo';
import Footer from '../../../components/footer/footer';
import { Steps, Step } from './components/steps';
import InnerHTMLHelper from '../../../utils/innerHTML';
import style from '../device.css';

@translate()
export default class SecurityInformation extends Component {
    state = {
        showInfo: true,
    }

    handleStart = () => {
        this.setState({ showInfo: false });
    }

    render({
        t,
        goBack,
        goal,
        children,
    }, {
        showInfo,
    }) {
        if (!showInfo) {
            return children[0];
        }
        return (
            <div class="contentWithGuide">
                <div className={style.container}>
                    <div className={style.content}>
                        <h1 className={style.title}>{t(`securityInformation.${goal}.title`)}</h1>
                        <Steps current={0}>
                            <Step title={t('goal.step.1.title')} description={t('goal.step.1.description')} />
                            <Step title={t('goal.step.2.title')} description={t('goal.step.2.description')} />
                            <Step title={t(`goal.step.3_${goal}.title`)} description={t(`goal.step.3_${goal}.description`)} />
                            <Step title={t(`goal.step.4_${goal}.title`)} description={t(`goal.step.4_${goal}.description`)} />
                        </Steps>
                        { goal === 'create' ? (
                            <div>
                                <InnerHTMLHelper tagName="p" html={t('securityInformation.create.description_1')} />
                                <InnerHTMLHelper tagName="p" html={t('securityInformation.create.description_2')} />
                                <ul>
                                    <InnerHTMLHelper tagName="li" html={t('securityInformation.create.description_3')} />
                                    <InnerHTMLHelper tagName="li" html={t('securityInformation.create.description_4')} />
                                </ul>
                                <InnerHTMLHelper tagName="p" html={t('securityInformation.create.description_5')} />
                                <div className="buttons buttons-end">
                                    <Button
                                        transparent
                                        onClick={goBack}>
                                        {t('button.back')}
                                    </Button>
                                    <Button primary onClick={this.handleStart}>
                                        {t('securityInformation.create.button')}
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <InnerHTMLHelper tagName="p" html={t('securityInformation.restore.description_1')} />
                                <InnerHTMLHelper tagName="p" html={t('securityInformation.restore.description_2')} />
                                <InnerHTMLHelper tagName="p" html={t('securityInformation.restore.description_3')} />
                                <p>{t('deviceTampered')}</p>
                                <div className="buttons buttons-end">
                                    <Button
                                        transparent
                                        onClick={goBack}>
                                        {t('button.back')}
                                    </Button>
                                    <Button primary onClick={this.handleStart}>
                                        {t('securityInformation.restore.button')}
                                    </Button>
                                </div>
                            </div>
                        )}
                        <hr />
                        <Footer>
                            <Shift />
                        </Footer>
                    </div>
                </div>
            </div>
        );
    }
}

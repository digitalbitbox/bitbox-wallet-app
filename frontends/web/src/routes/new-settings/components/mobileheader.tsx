import { useLocation } from 'react-router-dom';
import styles from './mobileheader.module.css';
import { TTab } from './hooks/useSettingsTab';
import { useTranslation } from 'react-i18next';
import { ChevronLeftDark, ChevronLeftLight } from '../../../components/icon';
import { useDarkmode } from '../../../hooks/darkmode';

type TProps = {
  settingsTabsDetail: TTab[];
}

export const MobileHeader = ({ settingsTabsDetail }: TProps) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const { isDarkMode } = useDarkmode();

  const activeTabIndex = settingsTabsDetail.findIndex(tab => tab.url === pathname);

  const backIcon = isDarkMode ? <ChevronLeftLight /> : <ChevronLeftDark />;

  const handleClick = () => {
    //goes to the 'general settings' page
  };
  return (
    <div className={styles.container}>
      <button onClick={handleClick} className={styles.backButton}>{backIcon} {t('button.back')}</button>
      <h1 className={styles.headerText}>{activeTabIndex >= 0 ? settingsTabsDetail[activeTabIndex].tabName : ''}</h1>
    </div>
  );
};

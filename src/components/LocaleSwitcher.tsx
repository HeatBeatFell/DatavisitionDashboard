import {useLocale, useTranslations} from 'next-intl';
import LocaleSwitcherSelect from './language-switcher';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      items={[
        {
          value: 'en',
          label: t('English')
        },
        {
          value: 'zh',
          label: t('Chinese')
        }
      ]}
      label={t('label')}
    />
  );
}
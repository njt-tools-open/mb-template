import { useTranslation } from 'react-i18next';

interface WithLocalProps {
  localKey: string;
}

export const WithLocal = ({ localKey }: WithLocalProps) => {
  const { t } = useTranslation();
  return <span>{t(localKey)}</span>;
};

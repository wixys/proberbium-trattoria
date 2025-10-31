const useCompanyData = () => {
  const companyData = async (lang: string) => {
    const { data, error } = useAsyncData(
      `company-data-${lang}`,
      () => queryContent(`/${lang}/company`).findOne(),
      {
        transform: (result) => result.data[0],
      }
    );

    return { data, error };
  };

  return { companyData };
};

export default useCompanyData;

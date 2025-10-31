const useSectionsDataCustomer = () => {
  const sectionDataCustomer = async (lang: string) => {
    const { data, error } = useAsyncData(
      `content-sections`,
      () => queryContent(`/${lang}/sections-customers`).findOne(),
      {
        transform: (result) => result.data,
      }
    );

    return { data, error };
  };

  return { sectionDataCustomer };
};

export default useSectionsDataCustomer;

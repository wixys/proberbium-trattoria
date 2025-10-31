const useSectionsData = () => {
  const sectionData = async (lang: string) => {
    const { data, error } = useAsyncData(
      `content-sections`,
      () => queryContent(`/${lang}/sections`).findOne(),
      {
        transform: (result) => result.data,
      }
    );

    return { data, error };
  };

  return { sectionData };
};

export default useSectionsData;

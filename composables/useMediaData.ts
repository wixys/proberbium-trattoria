const useMediaData = () => {
  const mediaData = async (lang: string) => {
    const { data, error } = useAsyncData(
      `media-data-${lang}`,
      () => queryContent(`/${lang}/media`).findOne(),
      {
        transform: (result) => result.data[0].attributes.images,
      }
    );

    return { data, error };
  };

  return { mediaData };
};

export default useMediaData;

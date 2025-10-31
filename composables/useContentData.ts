const useContentData = () => {
  const contentData = async (path: string) => {
    const { data, error } = useAsyncData(`content-${path}`, () => queryContent(path).findOne(), {
      transform: (result) => result.data[0],
    });

    return { data, error };
  };

  return { contentData };
};

export default useContentData;

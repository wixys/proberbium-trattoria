const useMenuData = () => {
  const menuData = async (lang: string) => {
    const { data, error } = useAsyncData(
      `menu-data-${lang}`,
      () => queryContent(`/${lang}/menu`).findOne(),
      {
        transform: (result) => result.data.attributes.items,
      }
    );

    return { data, error };
  };

  return { menuData };
};

export default useMenuData;

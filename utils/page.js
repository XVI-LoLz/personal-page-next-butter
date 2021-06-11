const getContentByPropType = (prop) => {
  const { type } = prop;
  const value = prop[type];
  switch (type) {
    case "title":
    case "rich_text":
      return value?.[0]?.plain_text || "";
    case "multi_select":
      return value?.map((el) => el.name);
    case "relation":
      return value?.map((el) => el.id);
    case "select":
      return value?.name || "";
    case "url":
    case "date":
    case "number":
      return value || "";
    case "checkbox":
    default:
      return value;
  }
};

const getPageInfo = (page) => {
  const {
    id,
    created_time: createdTime,
    last_edited_time: lastEditedTime,
    properties,
  } = page;
  const info = {
    id,
    createdTime,
    lastEditedTime,
  };

  Object.keys(properties).forEach(
    (propName) => (info[propName] = getContentByPropType(properties[propName]))
  );

  return info;
};

export { getPageInfo };

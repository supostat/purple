export const quickMenuFilter = (searchQuery, quickMenu) => {
  const searchQueryFilters = searchQuery
    .replace(/[^A-Za-z0-9 ]/g, '')
    .split(' ')
    .filter(i => i);

  return searchQueryFilters
    .reduce((menu, filter) => {
      const lowerFilter = filter.toLowerCase();
      return menu.map(parentItem => {
        let items = [];
        if (parentItem.title.toLowerCase().indexOf(lowerFilter) >= 0) {
          items = parentItem.items;
        } else {
          items = parentItem.items.filter(childItem => {
            const lowerTitle = childItem.title.toLowerCase();
            return lowerTitle.indexOf(lowerFilter) >= 0;
          });
        }
        return {
          title: parentItem.title,
          color: parentItem.color,
          name: parentItem.name,
          items,
        };
      });
    }, quickMenu)
    .filter(i => !!i.items.length);
};

export const generateQuickMenuAlias = text => {
  const splittedText = text.split(' ');
  if (splittedText.length > 1) {
    return splittedText[0][0] + splittedText[1][0].toLowerCase();
  }
  return text.slice(0, 2);
};

export const quickMenuHighlightResults = (result, searchQuery) => {
  const searchQueryFilters = searchQuery
    .replace(/[^A-Za-z0-9 ]/g, '')
    .split(' ')
    .filter(i => i);

  const uniqueFilter = searchQueryFilters.filter((v, i, a) => a.indexOf(v) === i);
  const query = new RegExp(uniqueFilter.join('|'), 'gi');

  return result.map(parentItem => {
    if (parentItem.highlightedTitle) {
      parentItem.highlightedTitle = parentItem.highlightedTitle.replace(
        /(<strong style="background-color:#FF9">|<\/strong>)/gi,
        '',
      );
    }
    parentItem.highlightedTitle = parentItem.title.replace(query, matched => {
      return `<strong style="background-color:#FF9">${matched}</strong>`;
    });
    const childItems = parentItem.items.map(childItem => {
      if (childItem.highlightedTitle) {
        childItem.highlightedTitle = childItem.highlightedTitle.replace(
          /(<strong style="background-color:#FF9">|<\/strong>)/gi,
          '',
        );
      }
      childItem.highlightedTitle = childItem.title.replace(query, matched => {
        return `<strong style="background-color:#FF9">${matched}</strong>`;
      });
      return childItem;
    });
    parentItem.items = childItems;
    return parentItem;
  });
};

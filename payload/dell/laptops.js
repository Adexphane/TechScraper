

const specParser = (cher) => {
    const specs = {};
  
    cher('ul.specs li').each((i, el) => {
      const li = cher(el);
      const title = li.find('div.h5').text().trim().replace(/\s*\*$/, '');
      const value = li.find('p').html() // Preserve line breaks
                       .replace(/<br>/g, '\n') // Convert <br> to newlines
                       .replace(/<[^>]+>/g, '') // Remove remaining HTML tags
                       .trim();
  
      // Convert title to camelCase for JSON keys
      const key = title.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      ).replace(/\s+/g, '');
  
      // Special handling for complex fields
      specs[key] = value.includes('\n') ? value.split('\n') : value;
    });
  
    return {
      productSpecifications: specs
    };
  };

  const getFirstMatchedText = (
    selectors,
    cher,
    defaultValue = "Not specified"
  ) => {
    for (const selector of selectors) {
      const element = cher(selector);
      if (element.length > 0) {
        const text = element.text().trim();
        if (text) return text; // Only return if non-empty
      }
    }
    return defaultValue;
  };

const laptopDetails = (cher) => ({
  title: getFirstMatchedText(
    ["h1.mb-md-0.mr-4.d-inline.title-tech-specs", "h1.mb-md-0.mr-4.d-inline","span.page-title.font-weight-md", '[itemprop="name"]'],
    cher
  ),
  model: cher("div.model-id.text-gray-700").text().trim(),
  rating: cher("a.rating-container").text().trim(),
  specs: specParser(cher).productSpecifications,
  price: cher("span.h3.font-weight-bold.mb-1.text-nowrap.sale-price").text().trim()
});

export default laptopDetails
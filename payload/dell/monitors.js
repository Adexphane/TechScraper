const techSpecsParser = (cher) => {
  const categories = [];

  // Select all specification category sections
  cher(".spec__main_wrapper").each((i, section) => {
    const $section = cher(section);
    const category = {
      name: $section.find(".spec__child__heading").text().trim(),
      specs: [],
    };

    // Process each specification item in the category
    $section.find(".spec__item").each((j, item) => {
      const $item = cher(item);
      const title = $item.find(".spec__item__title").text().trim();
      const valueContent = $item
        .clone()
        .children(".spec__item__title")
        .remove()
        .end();

      // Handle different value types (text, lists, etc)
      const value =
        valueContent.find("ul").length > 0
          ? valueContent
              .find("li")
              .map((k, li) => cher(li).text().trim())
              .get()
          : valueContent.text().trim();

      category.specs.push({ title, value });
    });

    if (category.specs.length > 0) {
      categories.push(category);
    }
  });

  return { technicalSpecifications: categories };
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

const monitorDetails = (cher) => ({
  title: getFirstMatchedText(
    ["h1.product-title", "div.pg-title", '[itemprop="name"]'],
    cher
  ),

  details: getFirstMatchedText(
    ["div#hero-long-desc", "div.long-description", "section.product-overview"],
    cher
  ),

  rating: getFirstMatchedText(
    ["a.snp-bv-rating", "div.user-rating", "span.review-score"],
    cher,
    "No ratings"
  ),

  specs: techSpecsParser(cher).technicalSpecifications,

  price: getFirstMatchedText(
    [
      "div.ps-simplified-price-container",
      "span.price",
      "div.product-price",
      "[data-price]",
    ],
    cher,
    "Price unavailable"
  ),
});

export default monitorDetails;

const specsParser = (element) => {
    const specs = {};
    
    // Get all specification groups (rows)
    element.querySelectorAll('.Specs_rows__cPyvQ').forEach(group => {
      const category = group.querySelector('.Specs_title__fzOf5').textContent.trim();
      specs[category] = {};
      
      // Get all specification items in this group
      group.querySelectorAll('.Specs_container__CkKYR').forEach(container => {
        const title = container.querySelector('.Specs_groupsItems__1pwx7').textContent.trim();
        const valueElement = container.querySelector('.Specs_specDetails__43whr');
        
        // Handle the value content
        let values = [];
        if (valueElement) {
          // Split by comma if the value contains multiple items
          const text = valueElement.textContent.trim();
          if (text.includes(',')) {
            values = text.split(',').map(v => v.trim());
          } else {
            values = [text];
          }
        }
        
        specs[category][title] = values.filter(v => v);
      });
    });
    
    return { technical_specifications: specs };
  };
  
  // Example usage:
  // const specs = specsParser(document.querySelector('#Specs'));
  // console.log(JSON.stringify(specs, null, 2));

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
  
  const levenoLaptopDetails = (cher) => ({
    title: getFirstMatchedText(
        ["div.ProductTitle_product__q2vDb", "h1.product_summary", "div.gallery-content"],
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
  
    specs: techSpecsParser(cher).technical_specifications,
  
    price: getFirstMatchedText(
      [
        "div.ps-simplified-price-container",
        "span.price-title",
        "div.product-price",
        "[data-price]",
      ],
      cher,
      "Price unavailable"
    ),
  });
  
  export default levenoLaptopDetails;
  
import re

with open(r'index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

# Match the brand div precisely
brand_match = re.search(r'<div class="brand">.*?<div class="brand-copy">.*?</div>\s*</div>', index_content, re.DOTALL)

if brand_match:
    brand_div = brand_match.group(0)
    print("Found brand div.")

    with open(r'singapore-attractions.html', 'r', encoding='utf-8') as f:
        attr_content = f.read()

    # Match the textual brand block in singapore-attractions.html
    text_brand_pattern = r'<div>\s*<div class="brand-title">Glance Limousine</div>\s*<div class="brand-sub">Luxury Transfers, Tours & Attractions</div>\s*</div>'
    
    if re.search(text_brand_pattern, attr_content, re.DOTALL):
        new_content = re.sub(text_brand_pattern, brand_div, attr_content, flags=re.DOTALL)
        with open(r'singapore-attractions.html', 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Logo synced successfully.")
    else:
        print("Could not find textual brand pattern in attractions page.")
else:
    print("Could not find brand div in index.html.")

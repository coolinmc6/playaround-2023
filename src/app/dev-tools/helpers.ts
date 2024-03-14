export const parseFormData = (formData: FormData) => {
  const data: any = {};
  const linkInputs = ['link-title', 'link-url', 'link-description', 'link-type'];
  formData.forEach((value, key) => {
    // if key contains "link", add it to links array
    if (linkInputs.some((linkInput) => key.includes(linkInput))) {
      const index = key.split('-')[2];
      const linkKey = key.split('-')[1];
      if (!data.links) {
        data.links = [];
      }
      const currLink = data.links[index] || {};
      currLink[`link-${linkKey}`] = value;
      data.links[index] = currLink
    } else {
      data[key] = value;
    }
  });

  data.links = data.links.filter((link: any) => {
    if (link['link-url']) {
      return link;
    }
  })

  return data;
}

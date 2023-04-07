import fetchMock from 'jest-fetch-mock';

function fetchData() {
  return fetch('https://cms.talkdesk.com/wp-json/web-api/v1/content/cards')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Something went wrong with the request');
      }
      return response.json();
    })
    .then((data) => {
      const options = data.data.list.map((item) => item.label.text);
      const fetchedData = data.data.list;
      return {
        options,
        fetchedData,
        filteredData: fetchedData
      };
    })
}

describe('API Test', () => {
  it('should fetch data and return options, fetchedData and filteredData', async () => {
    const mockResponse = {
      data: {
        list: [
          {
            image: {
              alt: "Image 1",
              src: "https://example.com/image1.jpg"
            },
            label: {
              text: "Technology"
            },
            title: "Technology Title",
            author: {
              name: "JR Tolkien"
            },
            date: "2023-04-07"
          },
          {
            image: {
              alt: "Image 2",
              src: "https://example.com/image2.jpg"
            },
            label: {
              text: "UX"
            },
            title: "UX of Maps",
            author: {
              name: "GRR Martin"
            },
            date: "2023-04-08"
          }
        ]
      }
    };

    jest.spyOn(window, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const expectedOptions = ['Technology', 'UX'];
    const expectedData = mockResponse.data.list;

    const { fetchedData, filteredData, options } = await fetchData();

    expect(window.fetch).toHaveBeenCalledWith('https://cms.talkdesk.com/wp-json/web-api/v1/content/cards');
    expect(options).toEqual(expectedOptions);
    expect(fetchedData).toEqual(expectedData);
    expect(filteredData).toEqual(expectedData);
  });

  it('should handle API errors', async () => {
    jest.spyOn(window, 'fetch').mockRejectedValue(new Error('Something went wrong with the request'));
    await expect(fetchData()).rejects.toThrow('Something went wrong with the request');
  });
});

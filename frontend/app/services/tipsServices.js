const server = "http://ec2-18-234-44-48.compute-1.amazonaws.com";

export const getTips = async () => {
  try {
    const response = await fetch(`${server}/advices/advice/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
};

export const getATip = async (tipId) => {
  try {
    console.log(tipId);
    const response = await fetch(`${server}/advices/advice/${tipId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();

    console.log("result test", result);
    return result;
  } catch (error) {
    throw error;
  }
};

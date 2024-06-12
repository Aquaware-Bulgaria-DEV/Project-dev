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

export const login = async (data) => {
  try {
    const response = await fetch(`${server}/profile/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: data.email,
        password: data.password,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const user = await response.json();
    if (user.token) {
      return user;
    } else {
      throw new Error("Грешен имейл или парола");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const register = async (email, password) => {
  try {
    const response = await fetch(`${server}/profile/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
    // console.error("Error:", error);
    // Alert.alert("Грешка", "Проблем при връзката със сървъра");
  }
};

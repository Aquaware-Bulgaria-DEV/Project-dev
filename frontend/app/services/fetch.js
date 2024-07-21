const server = 'http://ec2-18-234-44-48.compute-1.amazonaws.com';

export const getTips = async (token) => {
  try {
    const response = await fetch(
      `http://ec2-18-234-44-48.compute-1.amazonaws.com/advices/advice/`,
      {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
};

export const getATip = async (tipId, token) => {
  try {
    const response = await fetch(
      `http://ec2-18-234-44-48.compute-1.amazonaws.com/advices/advice/${tipId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();

    console.log('result test', result);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getAllProperties = async (token) => {
  try {
    const response = await fetch(
      `http://ec2-18-234-44-48.compute-1.amazonaws.com/water-management/properties/`,
      {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getPropertyRooms = async (id, token) => {
  try {
    const response = await fetch(
      `http://ec2-18-234-44-48.compute-1.amazonaws.com/water-management/properties/${id}/rooms/`,
      {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getRoomDetails = async (propertyId, roomId, token) => {
  try {
    const response = await fetch(
      `http://ec2-18-234-44-48.compute-1.amazonaws.com/water-management/properties/${propertyId}/rooms/${roomId}/`,
      {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const login = async (data) => {
  try {
    const response = await fetch(`${server}/profile/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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
      throw new Error('Грешен имейл или парола');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const register = async (email, password) => {
  try {
    const response = await fetch(`${server}/profile/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

export const addReport = async (setError, token, formValues) => {
  try {
    const response = await fetch(
      'http://ec2-18-234-44-48.compute-1.amazonaws.com/email/report/',
      {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formValues }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Something went wrong.');
    }
    setError('');
  } catch (e) {
    setError(e.message);
  }
};

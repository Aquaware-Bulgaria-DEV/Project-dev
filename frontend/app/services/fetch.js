import { Alert } from "react-native";
import { get, post } from "../../utils/request";
import { useTranslation } from "react-i18next";

const server = "http://ec2-18-234-44-48.compute-1.amazonaws.com";

export const getTips = async (token) => {
  try {
    const response = await fetch(
      `http://ec2-18-234-44-48.compute-1.amazonaws.com/advices/advice/`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
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

export const getWaterMetterDetails = async (id, token) => {
  try {
    const response = await fetch(
      `http://ec2-18-234-44-48.compute-1.amazonaws.com/water-management/properties/${id}/water-meter-readings/`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();

    console.log("water-meters details test", result);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getATip = async (tipId, token) => {
  try {
    const response = await fetch(
      `http://ec2-18-234-44-48.compute-1.amazonaws.com/advices/advice/${tipId}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
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

export const getAllProperties = async (token) => {
  try {
    const response = await fetch(
      `http://ec2-18-234-44-48.compute-1.amazonaws.com/water-management/properties/`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
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
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getAllPropertyDetails = async (id, token) => {
  try {
    const response = await fetch(
      `http://ec2-18-234-44-48.compute-1.amazonaws.com/water-management/properties/${id}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getAllCompanies = async (token) => {
  try {
    const response = await fetch(
      "http://ec2-18-234-44-48.compute-1.amazonaws.com/water-management/water-companies/",
      {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
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

export const getAllPropertyTypes = async (token) => {
  try {
    const response = await fetch(
      "http://ec2-18-234-44-48.compute-1.amazonaws.com/water-management/property-types/",
      {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
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

export const getUserRank = async (token, language) => {
  try {
    const response = await fetch(
      "http://ec2-18-234-44-48.compute-1.amazonaws.com/profile/user-rank/",
      {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      if (response.status === 404) {
        if (language === "bg") {
          Alert.alert(
            "Класацията не е намерена",
            "Няма достатъчно данни за участие в класацията!"
          );
        } else {
          Alert.alert(
            "The ranking is not found",
            "There is not enough data to participate in the ranking!"
          );
        }
      }
    }
    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error fetching user rank:", error);
    throw new Error(`Failed to fetch user rank: ${error.message}`);
  }
};

export const updateProfile = async (profileData, picture, token) => {
  const formData = new FormData();

  for (const key in profileData) {
    formData.append(key, profileData[key]);
  }

  if (picture) {
    const filename = picture.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;

    formData.append("profile_picture", {
      uri: picture,
      name: filename,
      type,
    });
  }

  try {
    const response = await fetch(
      "http://ec2-18-234-44-48.compute-1.amazonaws.com/profile/details/",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
        body: formData,
      }
    );

    const data = await response.json();
    return { data, response };
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const createProperty = async (token, data) => {
  try {
    const response = await fetch(
      `http://ec2-18-234-44-48.compute-1.amazonaws.com/water-management/properties/`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const editProperty = async (token, propId, data) => {
  try {
    console.log("djdjd");
    const response = await fetch(
      `http://ec2-18-234-44-48.compute-1.amazonaws.com/water-management/properties/${propId}/`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log("result fetch file", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const createARoom = async (token, propertyId, { name, room_type }) => {
  try {
    const response = await fetch(
      `http://ec2-18-234-44-48.compute-1.amazonaws.com/water-management/properties/${propertyId}/rooms/`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, room_type }),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const updateRoomDetails = async (
  propertyId,
  roomId,
  token,
  { name, room_type }
) => {
  try {
    console.log(` ${(roomId, propertyId)}`);
    console.log("Token:", token);
    console.log("Request Body:", { name, room_type });
    const response = await fetch(
      `http://ec2-18-234-44-48.compute-1.amazonaws.com/water-management/properties/${propertyId}/rooms/${roomId}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, room_type }),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const deleteRoom = async (token, roomId, propId) => {
  try {
    const response = await fetch(
      `http://ec2-18-234-44-48.compute-1.amazonaws.com/water-management/properties/${propId}/rooms/${roomId}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.status === 204) {
      return null;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getWaterMetters = async (token, value) => {
  try {
    const response = await fetch(
      `http://ec2-18-234-44-48.compute-1.amazonaws.com/water-management/properties/${value}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      // Here gets error because there is latency of useState hook for value.
      throw new Error("Something went wrong waterMeters (Ignore for now).");
    }

    const data = await response.json();
    const metterArray = data["water_meters"].map((item) => ({
      label: item["meter_number"],
      value: item["id"],
    }));

    return metterArray;
  } catch (err) {
    throw err;
  }
};
export const getRoomDetails = async (propertyId, roomId, token) => {
  try {
    const response = await fetch(
      `http://ec2-18-234-44-48.compute-1.amazonaws.com/water-management/properties/${propertyId}/rooms/${roomId}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
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

export const getAverageConsumption = async (propertyId, token) => {
  try {
    const response = await fetch(
      `http://ec2-18-234-44-48.compute-1.amazonaws.com/water-management/client-numbers/${propertyId}/average-consumption/`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    if (response.status === 400 || response.status === 500) {
      console.log("Error inside getAverageAPI:", result);
      throw new Error(result.error);
    }
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // console.log('Result consumption API :', result);
    return result;
  } catch (error) {
    throw error.message;
  }
};

export const getSelfReports = async (token) => {
  try {
    const response = await fetch(
      "http://ec2-18-234-44-48.compute-1.amazonaws.com/water-management/water-meter-readings/",
      {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    //Sorting in case the reports are not by the correct order and then reversing so the last report be in top of all in the frontend.
    const sortedResult = result.sort((a, b) => a.id - b.id);
    const reversedResult = sortedResult.reverse();
    return reversedResult;
  } catch (err) {
    throw err;
  }
};

export const getSingleSelfReport = async (token, id) => {
  try {
    const response = await fetch(
      `http://ec2-18-234-44-48.compute-1.amazonaws.com/water-management/water-meter-readings/${id}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
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

export const getRandomAdviceAndImage = async (token, waterUsage) => {
  try {
    const response = await fetch(
      "http://ec2-18-234-44-48.compute-1.amazonaws.com/water-management/consumption-advice/",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(waterUsage),
      }
    );
    if (!response.ok) {
      throw new Error(
        `Couldn't fetch advice and image. Response status: ${response.status}`
      );
    }
    const data = await response.json();
    console.log("Data:", data);
    return data;
  } catch (e) {
    throw e.message;
  }
};

export const deleteSelfReport = async (token, id) => {
  try {
    const response = await fetch(
      `http://ec2-18-234-44-48.compute-1.amazonaws.com/water-management/water-meter-readings/${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // If the response status is 204 (No Content), return null or some default value
    if (response.status === 204) {
      return null; // Or some indication that the deletion was successful
    }

    // Only attempt to parse JSON if there's a response body
    const result = await response.text(); // Use text() instead of json() to avoid errors on empty responses
    return result ? JSON.parse(result) : null;
  } catch (error) {
    throw error;
  }
};

export const login = async (data, language) => {
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

    if (response.status === 400) {
      if (language === "bg") {
        throw new Error("Потребителското Ви име или парола не съответстват");
      } else {
        throw new Error("Your username or password do not match");
      }
    }

    if (!response.ok) {
      if (language === "bg") {
        throw new Error(`HTTP грешка! Статус: ${response.status}`);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }

    const user = await response.json();
    if (user.token) {
      return user;
    } else {
      if (language === "bg") {
        throw new Error("Грешен имейл или парола");
      } else {
        throw new Error("Invalid email or password");
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const register = async (email, password, language) => {
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
      if (language === "bg") {
        throw new Error(`HTTP грешка! Статус: ${response.status}`);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (language === "bg") {
      throw new Error("Проблем при връзката със сървъра");
    } else {
      throw new Error("Problem connecting to the server");
    }
  }
};

export const addReport = async (token, formValues) => {
  try {
    const response = await fetch(
      "http://ec2-18-234-44-48.compute-1.amazonaws.com/email/report/",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formValues }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Something went wrong.");
    }
  } catch (e) {
    throw e.message;
  }
};

export const addSelfReport = async (bodyData) => {
  const url =
    "http://ec2-18-234-44-48.compute-1.amazonaws.com/water-management/water-meter-readings/";

  try {
    const response = await post(url, bodyData);

    // Handle specific case for status 400
    if (response.status === 400) {
      const result = await response.json();
      const errorMessage =
        result.error ||
        "Моля, въведете стойност, по-голяма от въведената при предишния самоотчет.";
      throw new Error(errorMessage);
    }

    if (response.status === 500) {
      throw new Error(`Моля въведете реална стойност.`);
    }

    return response;
  } catch (e) {
    // Log and rethrow the error with a message
    // console.error("Fetch error addSelfReportService:", e);
    throw e.message || e.error || "An unexpected error occurred";
  }
};

export const editSelfReport = async (token, value, waterMeterId) => {
  try {
    const response = await fetch(
      `http://ec2-18-234-44-48.compute-1.amazonaws.com/water-management/water-meter-readings/${waterMeterId}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: value }),
      }
    );

    // Check if the response content is JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const responseData = await response.json();
      // console.log("Response data:", responseData);
      if (response.status === 400) {
        throw new Error(`Моля въведете реална стойност.`);
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return responseData; // Return the parsed JSON response
    } else {
      // Log the text response (likely HTML) for debugging
      const responseText = await response.text();
      console.log("Non-JSON response (likely an error):", responseText);
      throw new Error(`Unexpected response format. Status: ${response.status}`);
    }
  } catch (e) {
    throw e.message;
  }
};

///

export const confirmPass = async (token, password) => {
  try {
    const response = await fetch(
      "http://ec2-18-234-44-48.compute-1.amazonaws.com/profile/deactivate/",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password }),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.log("Error", e);
    throw e;
  }
};

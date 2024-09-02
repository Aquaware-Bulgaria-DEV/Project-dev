import { getData } from "./storage";
import { EventRegister } from 'react-native-event-listeners';

const buildOptions = async (data) => {
    const options = {};

    if (data) {
        options.body = JSON.stringify(data);
        options.headers = {
            'Content-Type': 'application/json'
        };
    }

    const token = await getData('@auth_token');
    console.log("Requester token", token);

    if (token) {
        options.headers = {
            Authorization: `Token ${token}`,
            ...options.headers,
        };
    }

    return options;
};

const request = async (method, url, data = null) => {
    try {
        const options = await buildOptions(data);
        const response = await fetch(url, {
            ...options,
            method,
        });

        if (response.status === 401) {
            EventRegister.emit('unauthorized');
            return;
        }

        if (response.status === 204) {
            return {};
        }

        const result = await response.json();

        if (!response.ok) {
            throw result;
        }

        return result;
    } catch (e) {
        EventRegister.emit('error', e);
        throw new Error(e.message || e.error || "An unexpected error occurred");
    }
};

export const get = (url) => request('GET', url);
export const post = (url, data) => request('POST', url, data);
export const put = (url, data) => request('PUT', url, data);
export const remove = (url) => request('DELETE', url);
export const patch = (url, data) => request('PATCH', url, data);
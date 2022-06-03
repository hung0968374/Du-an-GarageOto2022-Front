import { useState, useEffect, useCallback } from 'react';

import { getLocalStorageItem, setLocalStorageItem } from '../helper/storage';

type inputStringFunction = () => string;

function typeCheckOfValue(value: string | inputStringFunction): string {
    if (value instanceof Function) {
        return value();
    } else {
        return value;
    }
}

export const useLocalStorage = (key: string, value: string | inputStringFunction) => {
    const [localValue, setLocalValue] = useState<string>(
        typeCheckOfValue(value) !== '' ? typeCheckOfValue(value) : String(getLocalStorageItem(key)),
    );
    const setValueIntoStorage = useCallback(() => {
        if (getLocalStorageItem(localValue) === null) {
            setLocalValue(localValue);
            setLocalStorageItem(key, localValue);
        } else {
            setLocalValue(String(getLocalStorageItem(localValue)));
            setLocalStorageItem(key, localValue);
        }
    }, [localValue, key]);

    useEffect(() => {
        setValueIntoStorage();
    }, [localValue, setValueIntoStorage]);

    return [localValue, setLocalValue] as const;
};

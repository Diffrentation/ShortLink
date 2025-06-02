import { nanoid } from 'nanoid';

function generateNanoId(length) {
    return nanoid(length);
}

export { generateNanoId };

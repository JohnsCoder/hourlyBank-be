type _ = undefined;
type Payload = {
username: string;
email: string;
password: string;
};

export type Arguments = [_, Payload]
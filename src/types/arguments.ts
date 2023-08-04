import { Daily } from "../entities/Daily";
import { Project } from "../entities/Project";
import { User } from "../entities/User";
import { MyContext } from "./context";

type _ = any;

export type Params = [_, User & Project & Daily & string, MyContext];

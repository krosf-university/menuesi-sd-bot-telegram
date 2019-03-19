import { ContextMessageUpdate } from 'telegraf'

export interface ContextMessageUpdateArgs extends ContextMessageUpdate {
    command?: { raw: String; command: String; args: String[]; };
}

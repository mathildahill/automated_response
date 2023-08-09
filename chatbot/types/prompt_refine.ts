export type PromptRefine = {
    tone: string;
    audience: string;
    contextual_information: string[];
}

export type PromptView = {
    title: string;
    description: string;
    // include other properties here
    audience: string[];
    tone: string[];
    contextual_information: string[];
}

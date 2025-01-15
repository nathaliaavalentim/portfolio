import prismaClient from "../../prisma"; 

interface EditTutorialRequest {
    tutorial_id: string;
    name?: string;
    content?: string;
    creator?: string;
}

class EditTutorialService {
    async execute({ tutorial_id, name, content, creator }: EditTutorialRequest) {
        const tutorial = await prismaClient.tutorial.update({
            where: { id: tutorial_id },
            data: {
                ...(name && { name }),
                ...(content && { content }),
                ...(creator && { creator }),
            },
        });

        return tutorial;
    }
}

export { EditTutorialService };

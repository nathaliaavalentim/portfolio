import prismaClient from "../../prisma";

interface TutorialRequest{
    name: string,
    content: string,
    creator: string
}

class CreateTutorialService{
    async execute({ name, content, creator }: TutorialRequest){
        const tutorial = await prismaClient.tutorial.create({
            data:{
                name: name,
                content: content, 
                creator: creator
            }
        })

        return tutorial;
    }
}

export { CreateTutorialService }
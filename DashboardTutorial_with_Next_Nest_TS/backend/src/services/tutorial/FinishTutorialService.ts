import prismaClient from "../../prisma";

interface TutorialRequest{
    tutorial_id: string;
}

class FinishTutorialService{
    async execute({tutorial_id}: TutorialRequest){

        const tutorial = await prismaClient.tutorial.update({
            where:{
                id: tutorial_id 
            },
            data:{
                status: true,
            }
        })
        return tutorial;

    }
}

export {FinishTutorialService}
import prismaClient from "../../prisma";

interface DetailRequest{
    tutorial_id: string;
}

class DetailsTutorialsService{
    async execute({tutorial_id}: DetailRequest){

        const tutorials = await prismaClient.tutorial.findMany({
            where:{
                id: tutorial_id
            }
        })
        return tutorials;
    }
}

export {DetailsTutorialsService}
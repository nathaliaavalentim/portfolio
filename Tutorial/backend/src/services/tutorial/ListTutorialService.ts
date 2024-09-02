import prismaClient from "../../prisma";


interface ListTutorialRequest {
    title?: string;
    creator?: string;
    keywords?: string;
}

class ListTutorialService{
    async execute({ title, creator, keywords }: ListTutorialRequest){
        const keywordArray = keywords ? keywords.split(' ') : [];
        const tutorials = await prismaClient.tutorial.findMany({
            where: {
                status: false,
                ...(title && {
                    name: {
                        contains: title,
                        mode: 'insensitive'
                    }
                }),
                ...(creator && {
                    creator: {
                        contains: creator,
                        mode: 'insensitive'
                    }
                }),
                ...(keywords && {
                    AND: keywordArray.map(keyword => ({
                        OR: [
                            {
                                name: {
                                    contains: keyword,
                                    mode: 'insensitive'
                                }
                            },
                            {
                                content: {
                                    contains: keyword,
                                    mode: 'insensitive'
                                }
                            }
                        ]
                    }))
                })
            }
        });

        return tutorials;
    }

}

export {ListTutorialService}
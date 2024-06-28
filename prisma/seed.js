const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    const createdUsers = await prisma.user.createManyAndReturn({
        data: [
            { username: 'alicea', email: 'something' },
            { username: 'janedoe', email: 'somethingelse' },
            { username: 'markymark', email: 'else' }
        ]
    });

    console.log(`Users created`, createdUsers);

    const createdProfiles = await prisma.profile.createManyAndReturn({
        data: [
            { 
                bio: 'balhdscbvdhsjc', 
                pictureUrl: 'ncddjvcddjv', 
                userId: createdUsers[0].id 
            },
            { 
                bio: 'bcdshvucgjbdhjsv', 
                pictureUrl: 'klnmvdijdhsv', 
                userId: createdUsers[1].id 
            },
            { 
                bio: 'oininocfiujdsbfbfduvyb', 
                pictureUrl: 'tyefdevsgcydgsvyegvy', 
                userId: createdUsers[2].id 
            }
        ]
    })

    console.log(`Profiles created`, createdProfiles);

    const createdPosts = await prisma.post.createManyAndReturn({
        data: [
            { 
                content: 'huvbchdscvuhcvdchgvdscdsghccgvydschdhsuvcdshv', 
                pictureUrl: 'jkcnsajdcbdsc', 
                title: 'hcbvshdjcv',
                userId: createdUsers[0].id 
            },
            { 
                content: 'huvbchdscvuhcvdchgvdscdsghccgvydschdhsuvcdshvfdvgdrfsvgfv',
                title: 'hcbvshdjcvdvsvvsd',
                userId: createdUsers[0].id 
            },
            { 
                content: 'huvbchdscvuhcvdchgvdscdsghdvfvfdfvfdfvfdvfdvsuvcdshv', 
                pictureUrl: 'jkcnsajdcbdscdscdscdsc', 
                title: 'dscdscdc',
                userId: createdUsers[1].id 
            },
            { 
                content: 'hudasxcscdfsvcdsvdsghdvfvfdfvfdfvfdvfdvsuvcdshv', 
                title: 'bgbgnhnmmgdfsxdsvx',
                userId: createdUsers[1].id 
            },
            { 
                content: 'hudasfbgmjlyupoykuikyjhfvcfvfdfvfdvfdvsuvcdshv', 
                title: 'sdfcxvbcvdfgdvx',
                userId: createdUsers[2].id 
            },
            { 
                content: 'qwdsefrthjuyhjkmhngbgbffvdvcxz',
                pictureUrl: 'nbcdbdhsjcvbdbdfhchv', 
                title: 'dsfccccccccccccgh',
                userId: createdUsers[2].id 
            }
        ]
    })

    console.log(`Posts created`, createdPosts);

    const createdComments = await prisma.comment.createManyAndReturn({
        data: [
            {
                content: 'hjucvbdsxbcsdjknxjksacbnx',
                userId: createdUsers[0].id,
                postId: createdPosts[1].id
            },
            {
                content: 'vghubdhsuvccjnsxzodpaswjcxn',
                userId: createdUsers[1].id,
                postId: createdPosts[2].id
            },
            {
                content: 'poiuytrdfcfvgvbgbhn',
                userId: createdUsers[2].id,
                postId: createdPosts[0].id
            }
        ]
    })

    console.log(`Comments created`, createdComments);

    const createdReplies = await prisma.comment.create({
        data: {
            content: 'this is a parent comment',
            userId: 2,
            postId: 1,
            replies: {
                create: {
                    content: 'this is a reply comment',
                    user: {
                        connect: {
                            id: 1
                        }
                    },
                    post: {
                        connect: {
                            id: 1
                        }
                    }
                }
            }
        },
        include: {
            replies: true
        }
    })

    console.log(`Replies created`, createdReplies);


    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })
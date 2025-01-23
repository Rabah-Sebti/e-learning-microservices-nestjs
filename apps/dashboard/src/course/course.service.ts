import { ForbiddenException, Injectable } from '@nestjs/common';
import {
  CoursesParamsDTO,
  CreateCourseDTO,
  Status,
  UpdateCourseDTO,
  UpdateProgressDTO,
} from './dto';
import { PrismaService } from '@app/common';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async createCourse(body: CreateCourseDTO) {
    const { course_instructors, ...rest } = body;
    const course = await this.prisma.course.create({
      data: {
        ...rest,
        course_instructors: {
          connect: course_instructors.map((id: number) => ({ id: Number(id) })),
        },
      },
    });
    return course;
  }

  async getCourses(limit: number, offset: number, params: CoursesParamsDTO) {
    // const newCourses = await this.prisma
    //   .$queryRaw`SELECT id,title,course_instructor as course_instructors from courses ,`;

    const where: any = {};

    // Filter by categories if provided
    if (params.categories && params.categories.length > 0) {
      where.course_category = {
        in: params.categories,
      };
    }

    // Filter by subCategories if provided
    if (params.subCategories && params.subCategories.length > 0) {
      where.course_sub_category = {
        in: params.subCategories,
      };
    }

    // Filter by price if provided
    if (params.prices && params.prices.length > 0) {
      where.price = {
        gte: params.prices[0], // Minimum price
        lte: params.prices[1], // Maximum price
      };
    }

    if (params.search) {
      where.OR = [
        { title: { contains: params.search } },
        { detail: { contains: params.search } },
      ];
    }

    let orderBy = {};
    if (params.sortBy && params.sortBy === Status.high_rated) {
      const courses = await this.prisma.course.findMany({
        where,
        include: {
          chapters: {
            select: {
              id: true,
              title: true,
              duration: true,
              lesson: {
                select: {
                  id: true,
                  title: true,
                  duration: true,
                },
              },
            },
          },
          course_instructors: {
            select: {
              name: true,
              expert: true,
              image_url: true,
            },
          },
          reviews: {
            select: {
              rate: true,
            },
          },
          _count: { select: { lessons: true } },
          category: {
            select: {
              title: true,
            },
          },
          sub_category: {
            select: {
              title: true,
            },
          },
        },
        skip: limit * offset,
        take: limit,
      });
      const courseCount = await this.prisma.course.count({ where });

      const coursesWithAvgRating = courses.map((course) => {
        const totalReviews = course.reviews.length;
        const overallRate =
          totalReviews > 0
            ? course.reviews.reduce((acc, review) => acc + review.rate, 0) /
              totalReviews
            : 0;
        return {
          ...course,
          lessons_count: course._count.lessons,
          // course_category: course.category.title,
          // course_sub_category: course.sub_category.title,
          overall_rate: {
            overall_rate: overallRate,
            total_reviews: totalReviews,
          },
          avgRating:
            course.reviews.reduce((acc, review) => acc + review.rate, 0) /
            course.reviews.length,
        };
      });

      const dataSorted = coursesWithAvgRating.sort(
        (a, b) => b.avgRating - a.avgRating,
      );

      return {
        recordsTotal: courseCount,
        data: dataSorted,
        pagination: true,
        message: 'Courses Retreived successfully',
      };
    }

    if (params.sortBy) {
      switch (params.sortBy) {
        case Status.newest:
          orderBy = { created_at: 'desc' }; // Assuming `createdAt` is the timestamp field
          break;
        case Status.best_seller:
          orderBy = { course_order: { _count: 'desc' } }; // Assuming `sales` is a field for best-selling courses
          break;
      }
    }

    const courses = await this.prisma.course.findMany({
      where,
      select: {
        id: true,
        title: true,
        price: true,
        discount_price: true,
        duration: true,
        media_url: true,
        // chapters: {
        //   select: {
        //     id: true,
        //     title: true,
        //     duration: true,
        //     lesson: {
        //       select: {
        //         id: true,
        //         title: true,
        //         duration: true,
        //       },
        //     },
        //   },
        // },
        course_instructors: {
          select: {
            name: true,
            expert: true,
            image_url: true,
          },
        },
        reviews: {
          select: {
            rate: true,
          },
        },
        _count: { select: { lessons: true } },
        category: {
          select: {
            title: true,
          },
        },
        sub_category: {
          select: {
            title: true,
          },
        },
        // course_order: {
        //   select: {
        //     _count: true,
        //   },
        // },
      },
      skip: offset,
      take: limit,
      orderBy,
    });

    const courseCount = await this.prisma.course.count({ where });
    const newCourses = courses.map((course) => {
      const totalReviews = course.reviews.length;
      const overallRate =
        totalReviews > 0
          ? course.reviews.reduce((acc, review) => acc + review.rate, 0) /
            totalReviews
          : 0;
      const { reviews, ...rest } = course;
      return {
        ...rest,
        // lessons_count: course._count.lessons,
        // course_category: course.category.title,
        // course_sub_category: course.sub_category.title,
        overall_rate: {
          overall_rate: overallRate,
          total_reviews: totalReviews,
        },
      };
    });
    return { recordsTotal: courseCount, data: newCourses, pagination: true };
  }
  async getAdminCourses(
    limit: number,
    offset: number,
    params: CoursesParamsDTO,
  ) {
    const courses = await this.prisma.course.findMany({
      select: {
        id: true,
        title: true,
        price: true,
        discount_price: true,
        duration: true,
        media_url: true,
        language: true,
        detail: true,
        // chapters: {
        //   select: {
        //     id: true,
        //     title: true,
        //     duration: true,
        //     lesson: {
        //       select: {
        //         id: true,
        //         title: true,
        //         duration: true,
        //       },
        //     },
        //   },
        // },
        course_instructors: {
          select: {
            name: true,
            expert: true,
            image_url: true,
          },
        },
        reviews: {
          select: {
            rate: true,
          },
        },
        _count: { select: { lessons: true } },
        category: {
          select: {
            title: true,
          },
        },
        sub_category: {
          select: {
            title: true,
          },
        },
        // course_order: {
        //   select: {
        //     _count: true,
        //   },
        // },
      },
      skip: offset,
      take: limit,
    });

    const courseCount = await this.prisma.course.count();
    const newCourses = courses.map((course) => {
      const totalReviews = course.reviews.length;
      const overallRate =
        totalReviews > 0
          ? course.reviews.reduce((acc, review) => acc + review.rate, 0) /
            totalReviews
          : 0;
      const { reviews, ...rest } = course;
      return {
        ...rest,
        // lessons_count: course._count.lessons,
        // course_category: course.category.title,
        // course_sub_category: course.sub_category.title,
        overall_rate: {
          overall_rate: overallRate,
          total_reviews: totalReviews,
        },
      };
    });
    return {
      recordsTotal: courseCount,
      data: newCourses,
      pagination: true,
      message: 'Courses Retreived successfully',
    };
  }
  async getSingleCourse(courseId: number) {
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        _count: {
          select: { lessons: true, chapters: true },
        },
        id: true,
        title: true,
        detail: true,
        price: true,
        discount_price: true,
        language: true,
        duration: true,
        certified: true,
        featured: true,
        // course_category: true,
        // course_sub_category: true,
        media_url: true,
        category: { select: { title: true } },
        sub_category: { select: { title: true } },
        course_instructors: {
          select: {
            id: true,
            expert: true,
            name: true,
          },
        },
        reviews: {
          select: {
            user: {
              select: {
                full_name: true,
              },
            },
            rate: true,
            created_at: true,
            review: true,
          },
        },
        chapters: {
          select: {
            id: true,
            title: true,
            duration: true,
            lesson: {
              select: {
                id: true,
                title: true,
                duration: true,
              },
            },
          },
        },
      },
    });
    const reviewsPercentage = [
      {
        rate: 3,
        percentage: 23,
        count: 4,
      },
    ];
    const totalReviews = course.reviews.length;
    const overallRate =
      totalReviews > 0
        ? course.reviews.reduce((acc, review) => acc + review.rate, 0) /
          totalReviews
        : 0;

    const { reviews, ...rest } = course;
    return {
      ...rest,
      // course_category: course.category.title,
      // course_sub_category: course.sub_category.title,
      overall_rate: {
        overall_rate: overallRate,
        total_reviews: totalReviews,
      },
      reviewsPercentage,
    };
  }
  async getSingleCourseAdmin(courseId: number) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      select: {
        id: true,

        course_instructors: { select: { id: true } },
        detail: true,
        title: true,
        price: true,
        discount_price: true,
        language: true,
        duration: true,
        certified: true,
        featured: true,
        media_url: true,
        category: { select: { id: true } },
        sub_category: { select: { id: true } },
      },
    });
    return course;
  }
  async getUserCourses(userId: number) {
    const courses = await this.prisma.course_Order.findMany({
      where: {
        user_id: userId,
        status: 'ORDER_APPROVED',
      },
      select: {
        courses: {
          select: {
            id: true,
            title: true,
            // course_category: {},
            category: { select: { title: true } },
            sub_category: { select: { title: true } },
            // course_sub_category: true,
            reviews: { select: { rate: true } },
            media_url: true,
          },
        },
      },
    });
    // const cour=await this.prisma.course.findMany({
    //   where:{
    //     course_order:{

    //     }
    //   }
    // })

    const userCourses = courses.flatMap((order) => order.courses);

    const formattedCourses = userCourses.map((course) => {
      const totalReviews = course.reviews.length;
      const overallRate =
        totalReviews > 0
          ? course.reviews.reduce((acc, review) => acc + review.rate, 0) /
            totalReviews
          : 0;
      return {
        ...course,
        course_category: course.category.title,
        course_sub_category: course.sub_category.title,
        overall_rate: {
          overall_rate: overallRate,
          total_reviews: totalReviews,
        },
        progress: 0,
      };
    });
    return formattedCourses;
    // return courses.flatMap((order) => order.courses);
  }

  async getCourseWatch(userId: number, courseId: number) {
    const order = await this.prisma.course_Order.findFirst({
      where: {
        user_id: userId,
        status: 'ORDER_APPROVED',
        courses: {
          some: {
            id: courseId,
          },
        },
      },
    });
    if (!order) throw new ForbiddenException('You can not access this course');
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        chapters: {
          orderBy: {
            id: 'asc',
          },
          select: {
            id: true,
            title: true,
            duration: true,
            lesson: {
              orderBy: {
                id: 'asc',
              },
              select: {
                id: true,
                title: true,
                duration: true,
              },
            },
          },
        },
        quiz: {
          select: {
            questions: true,
          },
        },
        reviews: {
          select: {
            rate: true,
          },
        },
        lessons: true,
        course_instructors: {
          select: {
            id: true,
            expert: true,
            name: true,
          },
        },
      },
    });
    const userWatchedLessons = await this.prisma.lessonProgress.findMany({
      where: {
        userId,
        courseId,
      },
      select: {
        lessonId: true,
      },
    });
    const watchedLessonIds = new Set(userWatchedLessons.map((l) => l.lessonId));
    course.chapters = course.chapters.map((chapter) => ({
      ...chapter,
      lesson: chapter.lesson.map((lesson) => ({
        ...lesson,
        watched: watchedLessonIds.has(lesson.id),
      })),
    }));
    const totalReviews = course.reviews.length;
    const overallRate =
      totalReviews > 0
        ? course.reviews.reduce((acc, review) => acc + review.rate, 0) /
          totalReviews
        : 0;
    const reviewsPercentage = [
      {
        rate: 3,
        percentage: 23,
        count: 4,
      },
    ];
    // const newChapters = course.chapters.map((chapter) => ({
    //   title: chapter.title,
    //   duration: chapter.duration,
    //   id: chapter.id,
    //   lesson: chapter.lesson,
    // }));
    return {
      id: course.id,
      title: course.title,
      chapters_count: course.chapters.length,
      duration: course.duration,
      chapters: course.chapters,
      quiz_questions_count: course.quiz.questions.length,
      quiz: course.quiz,
      overall_rate: {
        overall_rate: overallRate,
        totalReviews,
      },
      lessons_count: course.lessons.length,
      updated_at: course.updated_at,
      detail: course.detail,
      reviewsPercentage,
      course_instructors: course.course_instructors,
    };
  }

  async getCourseReviews(courseId: number) {
    const newPrisma = this.prisma.$extends({
      result: {
        user: {
          name: {
            needs: { username: true },
            compute(user) {
              return `${user.username} `;
            },
          },
        },
      },
    });
    const reviews = await newPrisma.review.findMany({
      where: {
        course_id: courseId,
      },
      select: {
        user: {
          select: {
            name: true,
          },
        },
        id: true,
        rate: true,
        review: true,
        created_at: true,
      },
    });
    const newReviews = reviews.map((review) => ({
      ...review,
      created_at: review.created_at,
    }));
    return newReviews;
  }

  async getCourseQuiz(courseId: number) {
    const quiz = await this.prisma.quiz.findUnique({
      where: {
        courseId,
      },
      select: {
        id: true,
        description: true,
        questions: {
          select: {
            id: true,
            description: true,
            choices: {
              select: {
                id: true,
                description: true,
              },
            },
          },
        },
        min_rate: true,
      },
    });
    // const newQuestions = quiz.Question.map((question) => ({
    //   id: question.id,
    //   description: question.description,
    //   choices: question.Choice,
    // }));
    // const newQuiz = {
    //   id: quiz.id,
    //   description: quiz.description,
    //   min_rate: quiz.min_rate,
    //   questions: newQuestions,
    // };
    return quiz;
  }

  async updateCourse(courseId: number, body: UpdateCourseDTO) {
    const course = await this.prisma.course.update({
      where: {
        id: courseId,
      },
      select: {
        id: true,
        detail: true,
        price: true,
        discount_price: true,
        featured: true,
        certified: true,
        title: true,
        language: true,
        category: { select: { id: true, title: true } },
        sub_category: { select: { id: true, title: true } },
        course_instructors: { select: { id: true } },
      },
      data: {
        ...body,
        // category: {
        //   connect: { id: body.course_category },
        // },
        // sub_category: { connect: { id: body.course_sub_category } },

        course_instructors: {
          connect: body.course_instructors.map((instr) => ({ id: instr })),
        },
        // connect: body.courses.map((course) => ({
        //   id: Number(course.course_id),
        // })),,
      },
    });
    return course;
  }

  async updateProgress(
    userId: number,
    courseId: number,
    body: UpdateProgressDTO,
  ) {
    // const lesson = await this.prisma.lesson.findUnique({
    //   where: {
    //     id: body.lesson_id,
    //     chapter_id: body.chapter_id,
    //     course_id: courseId,
    //   },
    // });
    // if (!lesson) throw new ForbiddenException('Record does not exist');
    // const lessonUpdated = await this.prisma.lesson.update({
    //   where: {
    //     id: body.lesson_id,
    //     chapter_id: body.chapter_id,
    //     course_id: courseId,
    //   },
    //   data: {
    //     watched: true,
    //   },
    // });
    // return lessonUpdated;
    const lessonUpp = this.prisma.lessonProgress.upsert({
      where: {
        userId_courseId_lessonId: {
          userId,
          courseId,
          lessonId: body.lesson_id,
        },
      },
      create: {
        userId,
        courseId,
        lessonId: body.lesson_id,
        watched: true,
      },
      update: {
        updated_at: new Date(),
      },
    });
    return lessonUpp;
  }
  async getAllCoursesIdsAdmin() {
    const courses = await this.prisma.course.findMany({
      select: {
        id: true,
        title: true,
      },
    });
    return courses;
  }
}

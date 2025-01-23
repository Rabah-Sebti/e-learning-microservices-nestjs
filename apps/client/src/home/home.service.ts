import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HomeService {
  constructor(private prisma: PrismaService) {}

  async getHomeData() {
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
    const banners = await this.prisma.banner.findMany();
    const categories = await this.prisma.category.findMany({
      select: {
        id: true,
        title: true,
        image_url: true,
        _count: {
          select: {
            Course: true,
          },
        },
        Course: {
          select: {
            _count: {
              select: {
                lessons: true,
              },
            },
          },
        },
      },
    });

    const newCategories = categories.map((cat) => {
      const lessons_count = cat.Course.reduce((sum, course) => {
        return sum + course._count.lessons;
      }, 0);
      return {
        id: cat.id,
        title: cat.title,
        image_url: cat.image_url,
        courses_count: cat._count.Course,
        lessons_count,
      };
    });
    const courses = await this.prisma.course.findMany({
      where: {
        featured: true,
      },
      include: {
        _count: { select: { lessons: true } },
        course_instructors: {
          select: {
            name: true,
            expert: true,
            image_url: true,
          },
        },
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
        reviews: {
          select: {
            rate: true,
          },
        },
      },
    });
    const instructors = await this.prisma.instructor.findMany({
      select: { name: true, expert: true, image_url: true },
    });
    const featured_courses = courses.map((course) => {
      const totalReviews = course.reviews.length;
      const overallRate =
        totalReviews > 0
          ? course.reviews.reduce((acc, review) => acc + review.rate, 0) /
            totalReviews
          : 0;

      return {
        ...course,
        // course_category: course.category.title,
        // course_sub_category: course.sub_category.title,
        overall_rate: {
          overall_rate: overallRate,
          total_reviews: totalReviews,
        },
      };
    });

    const subjects = await this.prisma.category.count();
    const totalCourses = await this.prisma.course.count();
    const instructorsCount = await this.prisma.instructor.count();
    const certified_courses = await this.prisma.course.count({
      where: {
        certified: true,
      },
    });
    const statistics = {
      subjects,
      courses: totalCourses,
      instructors: instructorsCount,
      certified_courses,
    };
    const testimonials = await newPrisma.review.findMany({
      select: {
        review: true,
        rate: true,
        user: {
          select: {
            name: true,
            diploma: true,
          },
        },
      },
    });
    return {
      banners,
      statistics,
      categories: newCategories,
      featured_courses,
      featured_products: [],
      instructors,
      testimonials,
    };
  }
}

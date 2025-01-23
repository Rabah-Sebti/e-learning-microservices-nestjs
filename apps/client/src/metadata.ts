/* eslint-disable */
export default async () => {
  const t = {
    ['./user/dto/user.dto']: await import('./user/dto/user.dto'),
    ['./course/dto/course.dto']: await import('./course/dto/course.dto'),
    ['./quiz/dto/quiz.dto']: await import('./quiz/dto/quiz.dto'),
    ['./course-orders/dto/course-orders.dto']: await import(
      './course-orders/dto/course-orders.dto'
    ),
  };
  return {
    '@nestjs/swagger': {
      models: [
        [
          import('./user/dto/user.dto'),
          {
            UpdateProfileDTO: {
              full_name: { required: false, type: () => String },
              dob: { required: false, type: () => String },
              state: { required: false, type: () => String },
              address: { required: false, type: () => String },
              mobile: { required: false, type: () => String },
              diploma: {
                required: false,
                enum: t['./user/dto/user.dto'].Diploma,
              },
              bio: { required: false, type: () => String },
              domain: {
                required: false,
                enum: t['./user/dto/user.dto'].Domain,
              },
            },
            UpdateAccountDTO: {
              email: { required: true, type: () => String },
              change_password: { required: true, type: () => Boolean },
            },
            ResetPasswordDTO: {
              token: { required: true, type: () => String },
              email: { required: true, type: () => String },
              password: { required: true, type: () => String },
              new_password: { required: true, type: () => String },
              password_confirmation: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./category/dto/category.dto'),
          {
            CreateCategoryDto: {
              title: { required: true, type: () => String },
              image_url: { required: false, type: () => String },
            },
            UpdateCategoryDTO: {
              title: { required: false, type: () => String },
              image_url: { required: false, type: () => String },
            },
          },
        ],
        [
          import('./banner/dto/banner.dto'),
          {
            CreateBannerDTO: {
              title: { required: true, type: () => String },
              description: { required: true, type: () => String },
              image_url: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./review/dto/review.dto'),
          {
            CreateReviewDTO: {
              rate: { required: true, type: () => Number },
              review: { required: true, type: () => String },
              course_id: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./course/dto/course.dto'),
          {
            CreateCourseDTO: {
              title: { required: true, type: () => String },
              detail: { required: true, type: () => String },
              price: { required: true, type: () => Number },
              discount_price: { required: true, type: () => Number },
              language: { required: true, type: () => String },
              duration: { required: true, type: () => String },
              certified: { required: true, type: () => Boolean },
              featured: { required: true, type: () => Boolean },
              course_category: { required: true, type: () => Number },
              course_sub_category: { required: true, type: () => Number },
              course_instructor: { required: true, type: () => [Number] },
              media_url: { required: false, type: () => String },
            },
            updateCourseDTO: {
              title: { required: false, type: () => String },
              detail: { required: false, type: () => String },
              price: { required: false, type: () => Number },
              discount_price: { required: false, type: () => Number },
              language: { required: false, type: () => String },
              duration: { required: false, type: () => String },
              certified: { required: false, type: () => Boolean },
              featured: { required: false, type: () => Boolean },
              course_category: { required: false, type: () => Number },
              course_sub_category: { required: false, type: () => Number },
              course_instructor: { required: false, type: () => [Number] },
              media_url: { required: false, type: () => String },
            },
            CoursesParamsDTO: {
              categories: { required: false, type: () => [Number] },
              subCategories: { required: false, type: () => [Number] },
              prices: { required: false, type: () => [Number] },
              duration: { required: false, type: () => [Number] },
              sortBy: {
                required: false,
                enum: t['./course/dto/course.dto'].Status,
              },
              search: { required: false, type: () => String },
            },
          },
        ],
        [
          import('./sub-category/dto/sub-category.dto'),
          {
            CreateSubCategoryDTO: {
              title: { required: true, type: () => String },
              category_id: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./lesson/dto/lesson.dto'),
          {
            CreateLessonDTO: {
              title: { required: true, type: () => String },
              duration: { required: true, type: () => String },
              course_id: { required: true, type: () => Number },
              chapter_id: { required: true, type: () => Number },
            },
          },
        ],

        [
          import('./quiz/dto/quiz.dto'),
          {
            CreateQuizDTO: {
              description: { required: true, type: () => String },
              min_rate: { required: true, type: () => Number },
            },
            AnswerDTO: {
              question_id: { required: true, type: () => Number },
              answer: { required: true, type: () => String },
            },
            SubmitQuizDTO: {
              answers: {
                required: true,
                type: () => [t['./quiz/dto/quiz.dto'].AnswerDTO],
              },
            },
          },
        ],
        [
          import('./course-orders/dto/course-orders.dto'),
          {
            CourseItemDto: {
              course_id: { required: true, type: () => Number, minimum: 1 },
              price: { required: true, type: () => Number, minimum: 0 },
            },
            PaymantDto: {
              method: {
                required: true,
                enum: t['./course-orders/dto/course-orders.dto'].PaymentMethod,
              },
              price: { required: true, type: () => Number, minimum: 0 },
            },
            StoreOrdersDTO: {
              coupon_id: { required: false, type: () => Number },
              courses: {
                required: true,
                type: () => [
                  t['./course-orders/dto/course-orders.dto'].CourseItemDto,
                ],
              },
              payment: {
                required: true,
                type: () =>
                  t['./course-orders/dto/course-orders.dto'].PaymantDto,
              },
              discount: { required: true, type: () => Number },
            },
          },
        ],

        [
          import('./product-sub-category/dto/product-sub-category.dto'),
          {
            CreateProductSubCategoryDTO: {
              title: { required: true, type: () => String },
              category_id: { required: true, type: () => Number },
            },
          },
        ],
      ],
      controllers: [
        [
          import('./auth/auth.controller'),
          { AuthController: { signUp: {}, signIn: {} } },
        ],
        [
          import('./user/user.controller'),
          {
            UserController: {
              getProfile: {},
              getDomains: {},
              getRelatedCourses: { type: [Object] },
              updatePicture: {},
              updateProfile: {},
              updateAccount: {},
              resetPassword: {},
            },
          },
        ],
        [
          import('./category/category.controller'),
          {
            CategoryController: {
              createCateory: {},
              getCategories: { type: [Object] },
              updateCategory: {},
            },
          },
        ],
        [
          import('./banner/banner.controller'),
          { BannerController: { createBanner: {}, getBanners: {} } },
        ],
        [
          import('./review/review.controller'),
          { ReviewController: { createReview: {}, getReviews: {} } },
        ],
        [
          import('./course/course.controller'),
          {
            CourseController: {
              createCourse: {},
              getCourses: {},
              getOneCourse: {},
              getUserCourses: {},
              getCourseWatch: {},
              getCourseReviews: {},
              getCourseQuiz: {},
              updateCourse: {},
            },
          },
        ],
        [
          import('./sub-category/sub-category.controller'),
          {
            SubCategoryController: {
              createSubCategory: {},
              getSubCategories: {},
            },
          },
        ],
        [
          import('./lesson/lesson.controller'),
          {
            LessonController: {
              createLesson: {},
              getLessons: {},
              uploadFile: {},
              getLessonUrl: {},
              streamVideo: {},
            },
          },
        ],
        [
          import('./instructor/instructor.controller'),
          {
            InstructorController: { createInstructor: {}, getInstructors: {} },
          },
        ],
        [
          import('./home/home.controller'),
          { HomeController: { getHomeData: {} } },
        ],
        [
          import('./contact/contact.controller'),
          { ContactController: { createContact: {}, getContact: {} } },
        ],
        [
          import('./about/about.controller'),
          { AboutController: { getAboutData: {} } },
        ],
        [
          import('./quiz/quiz.controller'),
          { QuizController: { createQuiz: {}, getQuiz: {}, submitQuiz: {} } },
        ],
        [
          import('./course-orders/course-orders.controller'),
          {
            CourseOrdersController: {
              storeCourses: {},
              getOrders: {},
              getOneOrder: {},
            },
          },
        ],
        [
          import('./product-category/product-category.controller'),
          {
            ProductCategoryController: {
              createCategory: {},
              getCategories: {},
            },
          },
        ],
        [
          import('./product-sub-category/product-sub-category.controller'),
          {
            ProductSubCategoryController: {
              createCategory: {},
              getCategories: {},
            },
          },
        ],
        [
          import('./product/product.controller'),
          { ProductController: { createProduct: {}, getProducts: {} } },
        ],
      ],
    },
  };
};

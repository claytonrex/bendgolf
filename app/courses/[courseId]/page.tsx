import { notFound } from "next/navigation";
import { COURSES, CourseId } from "@/lib/courses";
import { CourseGuide } from "@/components/CourseGuide";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = COURSES[courseId as CourseId];
  if (!course) notFound();
  return <CourseGuide course={course} />;
}

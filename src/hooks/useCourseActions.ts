import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseCourseActionsReturn {
  handlePreRegister: (courseId: string) => void;
  handleExplore: (courseId: string) => void;
}

export const useCourseActions = (): UseCourseActionsReturn => {
  const navigate = useNavigate();

  const handlePreRegister = useCallback((courseId: string) => {
    // TODO: Implement pre-registration logic
    console.log('Pre-registering for course:', courseId);
    // Could integrate with payment system, analytics, etc.
  }, []);

  const handleExplore = useCallback((courseId: string) => {
    // Navigate to course detail page
    navigate(`/courses/${courseId}`);
  }, [navigate]);

  return {
    handlePreRegister,
    handleExplore,
  };
};

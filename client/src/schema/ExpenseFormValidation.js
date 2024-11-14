import * as Yup from 'yup';

export const ExpenseFormSchema = Yup.object({
  description: Yup.string()
    .min(5, 'Description must be at least 5 characters')
    .max(100, 'Description must be less than 100 characters')
    .required('Description is required'),
  
  amount: Yup.number()
    .positive('Amount must be a positive number')
    .min(0.01, 'Amount must be at least 0.01')
    .required('Amount is required'),
  
  category: Yup.string().required('Category is required'),

  selectedFriends: Yup.array()
    .min(1, 'At least one friend must be selected')
    .required('You must select at least one friend'),
});

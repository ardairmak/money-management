// Helper function to calculate the difference in days between two dates
export const getDaysDifference = (dueDate: string): number => {
  // Months in text format
  const monthsText = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  // Parse the due date string
  const [month, day, year] = dueDate.split(' ')
  const monthIndex = monthsText.indexOf(month)
  const due = new Date(parseInt(year), monthIndex, parseInt(day), 0, 0, 0, 0)

  // Get current date
  const currentDate = new Date()

  // Calculate the difference in days
  const differenceInTime = due.getTime() - currentDate.getTime()
  const differenceInDays = differenceInTime / (1000 * 3600 * 24)

  return Math.round(differenceInDays)
}

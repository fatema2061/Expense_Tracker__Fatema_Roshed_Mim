import { getDashboardSummary } from '../services/dashboardService.js'

export const getSummary = async (req, res) => {
  try {
    const summary = await getDashboardSummary(
      req.user.userId
    )

    res.status(200).json({
      summary,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Failed to load dashboard summary',
    })
  }
}
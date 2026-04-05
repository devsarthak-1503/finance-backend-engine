/**
 * Role-based access control middleware
 * Ensures only authorized roles can access specific routes
 */

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            const userRole = req.user.role;

            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied: insufficient permissions",
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Authorization error",
            });
        }
    };
};

module.exports = authorizeRoles;

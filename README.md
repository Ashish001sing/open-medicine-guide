# Open Medicine Guide

A modern, open-source medicine guide app built with Next.js, React, and Prisma. Easily search medicines, check interactions, and manage custom entries. Bulk import and admin features included.

## Features

- Medicine search and details
- Medicine interaction checker
- Custom medicine entry
- Bulk CSV import (admin only)
- Password-protected admin page
- Modern UI with pill icons
- OpenFDA integration

## Getting Started

1. **Clone the repo**
	```bash
	git clone https://github.com/Ashish001sing/open-medicine-guide.git
	cd open-medicine-guide
	```

2. **Install dependencies**
	```bash
	npm install
	```

3. **Set up the database**
	```bash
	npx prisma migrate dev
	npx prisma generate
	```

4. **Run the app**
	```bash
	npm run dev
	```

## Contributing


We welcome contributions! Please follow these steps:

1. Fork the repository on GitHub.
2. Clone your fork locally:
	```bash
	git clone https://github.com/YOUR_USERNAME/open-medicine-guide.git
	cd open-medicine-guide
	```
3. Create a new branch for your feature or fix:
	```bash
	git checkout -b feature/your-feature-name
	```
4. Make your changes and commit them:
	```bash
	git add .
	git commit -m "Describe your changes"
	```
5. Push your branch to your fork:
	```bash
	git push origin feature/your-feature-name
	```
6. Open a Pull Request from your branch to the main repository.

## Contribution Guide

Please follow these guidelines to ensure a smooth contribution process:

- **Code Style:** Match the existing code style and formatting. Use descriptive variable and function names.
- **Commits:** Write clear, meaningful commit messages. Group related changes into a single commit.
- **Testing:** Add tests for new features or bug fixes when possible.
- **Documentation:** Update the README or add comments for new features, APIs, or changes.
- **Issues:** If you find a bug or want to request a feature, open an issue first to discuss it.
- **Pull Requests:** Reference related issues in your PR description. Explain what your change does and why.

Thank you for helping make Open Medicine Guide better!

## License

This project is licensed under the MIT License.

## Contact

For questions or suggestions, open an issue or contact [Ashish Kumar Singh](mailto:ashishkumarsingh92546@gmail.com).
# open-medicine-guide
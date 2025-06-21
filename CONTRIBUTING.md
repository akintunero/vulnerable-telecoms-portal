# Contributing to TelcoAdmin Portal CTF

Thank you for your interest in contributing to the TelcoAdmin Portal CTF project! This document provides guidelines for contributing to this educational security project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Your First Code Contribution](#your-first-code-contribution)
- [Pull Request Process](#pull-request-process)
- [Development Setup](#development-setup)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

- Use the GitHub issue tracker
- Include detailed steps to reproduce the bug
- Specify the environment (Docker version, OS, etc.)
- Include any error messages or logs

### Suggesting Enhancements

- Use the GitHub issue tracker with the "enhancement" label
- Describe the enhancement and its educational value
- Explain how it would improve the CTF experience

### Adding New Vulnerabilities

- Ensure vulnerabilities are realistic and educational
- Don't break core application functionality
- Make them subtle and not easily detectable by automated tools
- Document the vulnerability type and location
- Test thoroughly in the Docker environment

## Your First Code Contribution

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test your changes in Docker
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update the vulnerability count if adding new vulnerabilities
3. Ensure all tests pass in Docker environment
4. The PR will be merged once you have the sign-off of the maintainer

## Development Setup

1. Clone the repository
2. Run `docker-compose up -d` to start the environment
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Vulnerability Guidelines

When adding new vulnerabilities:

- **Educational Value**: Should teach real security concepts
- **Subtlety**: Should not be obvious or easily detectable
- **Safety**: Must not break the application or cause data loss
- **Documentation**: Must be documented in the vulnerability summary
- **Testing**: Must be tested in the Docker environment

## Contact

For questions about contributing, contact:
- **Name**: Olumayowa
- **Email**: akintunero101@gmail.com

Thank you for contributing to educational security!

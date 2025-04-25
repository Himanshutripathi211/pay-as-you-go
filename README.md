# Azure Cost Calculator

This project is a web tool that compares the costs between Azure’s Pay-as-you-go and Reserved Instances (1-year and 3-year) pricing models for virtual machines.

## Features
- Enter VM size, region, usage hours, and pricing term.
- Calculate estimated cost based on static pricing data.
- Frontend built with HTML/CSS/JavaScript.
- Backend built with Python Flask.
- Deployable on Azure App Service.

## Getting Started

### Prerequisites
- Python 3.x installed
- Flask installed (`pip install flask`)

### Running the Project
1. Clone the repository.
2. Navigate to `backend/` and run:  
   `python app.py`
3. Open your browser and navigate to `http://localhost:5000`.

## File Structure

- **backend/**: Contains the Flask backend and pricing data.
- **frontend/**: Contains HTML, CSS, and JavaScript files.
- **README.md**: This overview and instructions.

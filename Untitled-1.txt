# Import Flask and related modules needed to create API endpoints.
from flask import Flask, request, jsonify, send_from_directory
import json  # To handle JSON data (pricing data)

# Create a Flask application object.
app = Flask(__name__, static_folder='../frontend')

# Load the pricing data from a JSON file. This file contains cost information.
# Example data structure: { "eastus": { "Standard_B1s": {"payg": 0.012, "reserved_1yr": 0.010, "reserved_3yr": 0.008}, ... } }
with open('pricing_data.json') as f:
    pricing_data = json.load(f)

# Define an API endpoint '/calculate' that accepts POST requests.
@app.route('/calculate', methods=['POST'])
def calculate_cost():
    # Parse incoming JSON data from the request.
    data = request.get_json()
    # Retrieve each parameter sent from the frontend form.
    vm_size = data.get('vm_size')
    usage_hours = float(data.get('usage_hours'))
    term = data.get('term')   # term can be "PAYG", "1yr", or "3yr"
    region = data.get('region')

    # Look up pricing for the given region and VM size in the pricing_data.
    prices = pricing_data.get(region, {}).get(vm_size, None)
    # If no pricing data was found, return an error.
    if prices is None:
        return jsonify({'error': 'Invalid region or vm_size'}), 400

    # Calculate cost based on the selected pricing term.
    if term == 'PAYG':
        cost = prices['payg'] * usage_hours
    elif term == '1yr':
        cost = prices['reserved_1yr'] * usage_hours
    elif term == '3yr':
        cost = prices['reserved_3yr'] * usage_hours
    else:
        # Return an error if an invalid term is provided.
        return jsonify({'error': 'Invalid term'}), 400

    # Return the calculated cost as a JSON object.
    return jsonify({'cost': cost})

# When the root URL '/' is accessed, serve the index.html file from the frontend folder.
@app.route('/')
def serve_frontend():
    return send_from_directory(app.static_folder, 'index.html')

# Run the Flask application in debug mode when this script is executed directly.
if __name__ == '__main__':
    app.run(debug=True)

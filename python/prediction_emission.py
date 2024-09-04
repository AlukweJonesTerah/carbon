# predict_emission.py
import joblib
import pandas as pd

# Load the model
model = joblib.load('emission_model.pkl')

# Load new data for prediction
new_data = pd.read_csv('new_emission_data.csv')

# Make predictions
predictions = model.predict(new_data)

# Save predictions
new_data['predicted_co2Emission'] = predictions
new_data.to_csv('predicted_emission_data.csv', index=False)

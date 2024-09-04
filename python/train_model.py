# train_model.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblib

# Load your emission data
data = pd.read_csv('emission_data.csv')

# Prepare the data
X = data[['feature1', 'feature2', 'feature3']]  # Replace with your actual features
y = data['co2Emission']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, 'emission_model.pkl')

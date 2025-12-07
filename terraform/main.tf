# 1. Configure GCP Provider
terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# 2. Create the Cloud Storage Bucket
resource "google_storage_bucket" "website_bucket" {
  name          = var.bucket_name
  location      = var.region
  force_destroy = true # Allows easy cleanup

  # Enable Static Website Hosting
  website {
    main_page_suffix = "index.html"
    not_found_page   = "404.html"
  }
}

# 3. Grant Public Read Access to all objects
resource "google_storage_bucket_iam_member" "public_access" {
  bucket = google_storage_bucket.website_bucket.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

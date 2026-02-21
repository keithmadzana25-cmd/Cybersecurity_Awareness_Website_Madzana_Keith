/**
 * Certificate Module - Generate and Manage Certificates
 */

class CertificateModule {
    constructor() {
        this.certificates = [];
    }

    async loadCertificates() {
        if (!api.isAuthenticated()) {
            return null;
        }

        try {
            const response = await api.getCertificates();
            this.certificates = response.certificates;
            return response;
        } catch (error) {
            console.error('Failed to load certificates:', error);
            return null;
        }
    }

    async generateCertificate() {
        if (!api.isAuthenticated()) {
            alert('Please login to generate certificate');
            return null;
        }

        try {
            const response = await api.generateCertificate();
            this.certificates.push(response.certificate);
            return response;
        } catch (error) {
            alert('Certificate Generation Error: ' + error.message);
            return null;
        }
    }

    async displayCertificateModal() {
        const certs = await this.loadCertificates();
        if (!certs) return;

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'certificate-modal';
        
        let html = `
            <div class="modal-content certificate-modal">
                <span class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                <h3>Your Certificates</h3>
        `;

        if (certs.total_certificates === 0) {
            html += `
                <p>You haven't earned any certificates yet.</p>
                <p>Reach "Expert" level in the security quiz to earn your first certificate!</p>
                <button onclick="certificateModule.attemptGenerate()" class="btn btn-primary">Check Eligibility</button>
            `;
        } else {
            html += `
                <div class="certificates-list">
            `;
            certs.certificates.forEach(cert => {
                html += `
                    <div class="certificate-card">
                        <h4>${cert.level} Certificate</h4>
                        <p>Certificate Code: ${cert.certificate_code}</p>
                        <p>Issued: ${new Date(cert.issued_date).toLocaleDateString()}</p>
                        ${cert.expires_date ? `<p>Expires: ${new Date(cert.expires_date).toLocaleDateString()}</p>` : ''}
                        <button onclick="certificateModule.downloadCertificate('${cert.certificate_code}')" class="btn btn-secondary">Download PDF</button>
                    </div>
                `;
            });
            html += `
                </div>
            `;
        }

        html += `
            </div>
        `;

        modal.innerHTML = html;
        document.body.appendChild(modal);
    }

    async attemptGenerate() {
        const response = await this.generateCertificate();
        if (response) {
            alert('Certificate generated successfully! Code: ' + response.certificate.certificate_code);
            // Reload modal
            document.getElementById('certificate-modal')?.remove();
            await this.displayCertificateModal();
        }
    }

    downloadCertificate(certCode) {
        // This would integrate with a backend endpoint to generate PDF
        alert('Download feature for certificate ' + certCode + ' coming soon!');
    }

    generatePDF(certificateData) {
        // Uses jsPDF library to generate PDF certificate
        // Placeholder for future implementation
        const doc = new jsPDF();
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(28);
        doc.text('Certificate of Achievement', 105, 40, { align: 'center' });
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.text(`Security Level: ${certificateData.level}`, 105, 80, { align: 'center' });
        doc.text(`Certificate Code: ${certificateData.certificate_code}`, 105, 100, { align: 'center' });
        doc.text(`Issued Date: ${certificateData.issued_date}`, 105, 120, { align: 'center' });
        
        doc.save(`Certificate_${certificateData.certificate_code}.pdf`);
    }
}

// Initialize certificate module
const certificateModule = new CertificateModule();

// Function to show certificates
async function showCertificates() {
    await certificateModule.displayCertificateModal();
}
